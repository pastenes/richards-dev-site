import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

export const SETTINGS_ID = 'siteSettings'
// TODO: drop the `resumeSettings` fallback (and from the listener) once the site-settings migration
// has run on production.
const QUERY = `coalesce(*[_id == "${SETTINGS_ID}"][0].siteResume._ref, *[_id == "resumeSettings"][0].siteResume._ref)`

/**
 * The `_id` of the resume the site shows (`siteSettings.siteResume`), kept live. `undefined` while
 * loading, `null` when none is picked yet (the site then falls back to the document `resume`).
 */
export function useSiteResumeId(): string | null | undefined {
  const client = useClient({apiVersion: '2024-01-01'})
  const [id, setId] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    const refresh = () => client.fetch<string | null>(QUERY).then((value) => setId(value ?? null))
    refresh()
    const subscription = client
      .listen(`*[_id in ["${SETTINGS_ID}", "resumeSettings"]]`, {}, {visibility: 'query'})
      .subscribe(() => refresh())
    return () => subscription.unsubscribe()
  }, [client])

  return id
}
