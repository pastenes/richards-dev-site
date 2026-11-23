import {useState} from 'react'
import {useClient, type DocumentActionComponent, type SanityDocument} from 'sanity'
import {useToast} from '@sanity/ui/toast'
import {FaDownload, FaExternalLinkAlt, FaFilePdf} from 'react-icons/fa'

// The site that renders the PDF (its Netlify function `resume-pdf` prints `/resume?id=…` or
// `/cover-letter?id=…`). Set SANITY_STUDIO_SITE_URL in studio/.env.development to test another deploy.
const SITE_URL = process.env.SANITY_STUDIO_SITE_URL || 'https://pastenes.dev'

type PdfOptions = {
  /** The site page the function prints (its `page` parameter). */
  page: 'resume' | 'cover-letter'
  label: string
  title: string
  /** The uploaded file's name, `.pdf` included. */
  fileName: (published: SanityDocument) => string
  /** More pages than this saves the PDF with a warning instead of a success toast. */
  maxPages: number
  tooLong: string
}

/**
 * A "Generate … PDF" action: prints the published document to PDF on the site (light theme,
 * selectable text, A4), uploads it, and stores it in the document's `pdf` field. Hidden until the
 * document is published with no pending changes; Publish is the main button then.
 */
function generatePdfAction(options: PdfOptions): DocumentActionComponent {
  const Action: DocumentActionComponent = ({id, draft, published}) => {
    const client = useClient({apiVersion: '2024-01-01'})
    const toast = useToast()
    const [busy, setBusy] = useState(false)

    if (!published || (draft && !busy)) return null

    return {
      label: busy ? 'Generating PDF…' : options.label,
      icon: FaFilePdf,
      title: options.title,
      disabled: busy,
      onHandle: async () => {
        setBusy(true)
        try {
          const response = await fetch(
            `${SITE_URL}/.netlify/functions/resume-pdf?id=${encodeURIComponent(id)}&page=${options.page}`,
          )
          if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)
          const pages = Number(response.headers.get('x-pdf-pages')) || 1
          const fileName = options.fileName(published)

          const asset = await client.assets.upload('file', await response.blob(), {
            filename: fileName,
            contentType: 'application/pdf',
          })
          await client
            .patch(id)
            .set({pdf: {_type: 'file', asset: {_type: 'reference', _ref: asset._id}}})
            .commit()

          toast.push(
            pages > options.maxPages
              ? {
                  status: 'warning',
                  title: `PDF saved, but it runs to ${pages} pages`,
                  description: options.tooLong,
                  closable: true,
                }
              : {
                  status: 'success',
                  title: 'PDF generated',
                  description: (
                    <a href={asset.url} target="_blank" rel="noreferrer">
                      Open {fileName}
                    </a>
                  ),
                  closable: true,
                },
          )
        } catch (error) {
          toast.push({
            status: 'error',
            title: 'Could not generate the PDF',
            description: error instanceof Error ? error.message : String(error),
            closable: true,
          })
        } finally {
          setBusy(false)
        }
      },
    }
  }
  Action.displayName = `Generate(${options.page})`
  return Action
}

export const GenerateResumePdfAction = generatePdfAction({
  page: 'resume',
  label: 'Generate Resume PDF',
  title: 'Print the published resume to PDF and save it in the PDF tab',
  fileName: (published) => `${(published.pdfFileName as string | undefined) || 'Resume-Richard-Pastenes'}.pdf`,
  maxPages: 2,
  tooLong: 'Resumes read best on two pages at most. Trim the content, publish, and generate it again.',
})

/** "Richard Pastenes Cover Letter - <job title> - <employer>.pdf", minus characters file systems reject. */
function coverLetterFileName(published: SanityDocument) {
  const clean = (value: unknown) =>
    String(value ?? '')
      .replace(/[\\/:*?"<>|]+/g, '-')
      .replace(/\s+/g, ' ')
      .trim()
  const role = [clean(published.jobTitle), clean(published.employer)].filter(Boolean).join(' - ')
  return `Richard Pastenes Cover Letter${role ? ` - ${role}` : ''}.pdf`
}

export const GenerateCoverLetterPdfAction = generatePdfAction({
  page: 'cover-letter',
  label: 'Generate Cover Letter PDF',
  title: 'Print the published cover letter to PDF and save it in the PDF field',
  fileName: coverLetterFileName,
  maxPages: 1,
  tooLong: 'Cover letters read best on one page. Trim the letter, publish, and generate it again.',
})

/** The stored PDF's CDN URL, from the published document's `pdf` field (null until one is generated). */
function usePdfUrl(published: SanityDocument | null) {
  const client = useClient({apiVersion: '2024-01-01'})
  const ref = (published?.pdf as {asset?: {_ref?: string}} | undefined)?.asset?._ref
  // File asset IDs are `file-<hash>-<extension>`.
  const match = ref?.match(/^file-([a-f0-9]+)-(\w+)$/)
  if (!match) return null
  const {projectId, dataset} = client.config()
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${match[1]}.${match[2]}`
}

/**
 * "Download PDF": saves the stored PDF under the name it was uploaded with (an empty `?dl=` makes
 * Sanity's CDN send it as an attachment with its original file name).
 */
export const DownloadPdfAction: DocumentActionComponent = ({published}) => {
  const url = usePdfUrl(published)
  if (!url) return null
  return {
    label: 'Download PDF',
    icon: FaDownload,
    title: 'Download the generated PDF',
    onHandle: () => {
      window.location.href = `${url}?dl=`
    },
  }
}

/** "Open PDF": the stored PDF in a new tab. */
export const OpenPdfAction: DocumentActionComponent = ({published}) => {
  const url = usePdfUrl(published)
  if (!url) return null
  return {
    label: 'Open PDF',
    icon: FaExternalLinkAlt,
    title: 'Open the generated PDF in a new tab',
    onHandle: () => {
      window.open(url, '_blank', 'noopener')
    },
  }
}
