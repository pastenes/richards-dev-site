import {useState} from 'react'
import {useClient, type DocumentActionComponent} from 'sanity'
import {useToast} from '@sanity/ui/toast'
import {FaFilePdf} from 'react-icons/fa'

// The site that renders the PDF (its Netlify function `resume-pdf` prints `/resume?id=…`).
// Set SANITY_STUDIO_SITE_URL in studio/.env.development to test against another deploy.
const SITE_URL = process.env.SANITY_STUDIO_SITE_URL || 'https://pastenes.dev'

/**
 * "Generate Resume PDF": prints the published resume to PDF on the site (light theme, selectable
 * text, A4), uploads it, and stores it in the resume's `pdf` field.
 */
export const GenerateResumePdfAction: DocumentActionComponent = ({id, draft, published}) => {
  const client = useClient({apiVersion: '2024-01-01'})
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  // Hidden until the resume is published with no pending changes; Publish is the main button then.
  if (!published || (draft && !busy)) return null

  return {
    label: busy ? 'Generating PDF…' : 'Generate Resume PDF',
    icon: FaFilePdf,
    title: 'Print the published resume to PDF and save it in the PDF tab',
    disabled: busy,
    onHandle: async () => {
      setBusy(true)
      try {
        const response = await fetch(`${SITE_URL}/.netlify/functions/resume-pdf?id=${encodeURIComponent(id)}`)
        if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)
        const pages = Number(response.headers.get('x-pdf-pages')) || 1
        const fileName = `${(published.pdfFileName as string | undefined) || 'Resume-Richard-Pastenes'}.pdf`

        const asset = await client.assets.upload('file', await response.blob(), {
          filename: fileName,
          contentType: 'application/pdf',
        })
        await client
          .patch(id)
          .set({pdf: {_type: 'file', asset: {_type: 'reference', _ref: asset._id}}})
          .commit()

        toast.push(
          pages > 2
            ? {
                status: 'warning',
                title: `PDF saved, but it runs to ${pages} pages`,
                description: 'Resumes read best on two pages at most. Trim the content, publish, and generate it again.',
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
