import {useState} from 'react'
import {useClient, type DocumentActionComponent, type DocumentBadgeComponent} from 'sanity'
import {FaGlobeAmericas} from 'react-icons/fa'
import {SETTINGS_ID, useSiteResumeId} from './useSiteResumeId'

/** "Show on site": makes this resume the one at /resume and behind the site's PDF button. */
export const ShowOnSiteAction: DocumentActionComponent = ({id, published}) => {
  const client = useClient({apiVersion: '2024-01-01'})
  const siteResumeId = useSiteResumeId()
  const [saving, setSaving] = useState(false)
  const isSiteResume = siteResumeId === id || (siteResumeId === null && id === 'resume')

  return {
    label: isSiteResume ? 'Shown on site' : saving ? 'Saving…' : 'Show on site',
    icon: FaGlobeAmericas,
    title: !published
      ? 'Publish this resume first'
      : isSiteResume
        ? 'This is the resume the site shows'
        : 'Show this resume at /resume and behind the PDF button (replaces the current one)',
    disabled: !published || isSiteResume || saving || siteResumeId === undefined,
    onHandle: async () => {
      setSaving(true)
      try {
        await client
          .transaction()
          .createIfNotExists({_id: SETTINGS_ID, _type: 'resumeSettings'})
          .patch(SETTINGS_ID, (patch) => patch.set({siteResume: {_type: 'reference', _ref: id}}))
          .commit()
      } finally {
        setSaving(false)
      }
    },
  }
}

/** Green "On site" badge on the resume the site shows. */
export const SiteResumeBadge: DocumentBadgeComponent = ({id}) => {
  const siteResumeId = useSiteResumeId()
  const isSiteResume = siteResumeId === id || (siteResumeId === null && id === 'resume')
  return isSiteResume ? {label: 'On site', color: 'success', title: 'Shown at /resume and behind the PDF button'} : null
}
