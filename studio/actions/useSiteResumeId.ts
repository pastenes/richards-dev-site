import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

export const SETTINGS_ID = 'resumeSettings'
const QUERY = `*[_id == "${SETTINGS_ID}"][0].siteResume._ref`

/**
 * The `_id` of the resume the site shows (`resumeSettings.siteResume`), kept live. `undefined` while
 * loading, `null` when none is picked yet (the site then falls back to the document `resume`).
 */
export function useSiteResumeId(): string | null | undefined {
  const client = useClient({apiVersion: '2024-01-01'})
  const [id, setId] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    const refresh = () => client.fetch<string | null>(QUERY).then((value) => setId(value ?? null))
    refresh()
    const subscription = client
      .listen(`*[_id == "${SETTINGS_ID}"]`, {}, {visibility: 'query'})
      .subscribe(() => refresh())
    return () => subscription.unsubscribe()
  }, [client])

  return id
}
