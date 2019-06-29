import { useState} from 'react'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import ActivityDetail from './ActivityDetail/ActivityDetail.js'
import SidebarMobile from './Activities/SidebarMobile.js'
import ActivitiesList from './Activities/ActivitiesList.js'

const Activities = ({ setScreen, activities }) => {

  const [showActivities, setShowActivities] = useState(false)
  const [currentActivity, setCurrentActivity] = useState(null)

  return (
    <div className="Activities" css={css`
      display: grid;
      grid-template-columns: 300px auto;
      grid-template-areas: "sidebar-desktop main";
      width: 100vw;
      height: 100vh;

      @media (max-width: 800px) {
        grid-template-columns: 80px auto;
        grid-template-areas: "sidebar-mobile ${showActivities ? 'sidebar-desktop' : 'main'}";
      }
    `}>

      <ActivitiesList
        showActivities={showActivities}
        setShowActivities={setShowActivities}
        activities={activities}
        setCurrentActivity={setCurrentActivity}
        setScreen={setScreen} />

      <SidebarMobile
        showActivities={showActivities}
        setShowActivities={setShowActivities} />

      <ActivityDetail
        showActivities={showActivities}
        currentActivity={currentActivity} />

    </div>
  )
}

export default Activities
