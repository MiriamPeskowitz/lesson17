/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import ActivityLocation from './ActivityLocation'

const ActivityDetail = ({ showActivities, currentActivity }) => {
  if (!currentActivity) {
    return <div></div>
  }
  return (
    <div className="Detail" css={css`
      display: ${showActivities ? 'none' : 'block'};
      grid-area: main;
    `}>
      <h1 css={css`
        padding-top: 40px;
        padding-bottom: 40px;
      `}>{currentActivity.title}</h1>

      <ActivityLocation location={currentActivity.location} />

      <p>{currentActivity.description}</p>
    </div>
  )
}

export default ActivityDetail
