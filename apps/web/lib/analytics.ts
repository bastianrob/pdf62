import { sendGAEvent } from '@next/third-parties/google'

export function trackToolExecution(
  action: 'split' | 'merge' | 'compress' | 'extract',
  metadata: {
    fileSizeBytes?: number
    pageCount?: number
    quality?: number
    scale?: number
    success: boolean
    error?: string
  }
) {
  let sizeBucket = 'unknown'
  if (metadata.fileSizeBytes !== undefined) {
    const mb = metadata.fileSizeBytes / (1024 * 1024)
    if (mb < 1) sizeBucket = '<1MB'
    else if (mb < 5) sizeBucket = '1MB-5MB'
    else if (mb < 10) sizeBucket = '5MB-10MB'
    else sizeBucket = '>10MB'
  }

  if (!process.env.NEXT_PUBLIC_GA_ID) return

  sendGAEvent({
    event: 'tool_execution',
    tool_action: action,
    file_size_bucket: sizeBucket,
    page_count: metadata.pageCount,
    compress_quality: metadata.quality,
    compress_scale: metadata.scale,
    status: metadata.success ? 'success' : 'error',
    error_message: metadata.error ? metadata.error.substring(0, 100) : undefined,
  })
}
