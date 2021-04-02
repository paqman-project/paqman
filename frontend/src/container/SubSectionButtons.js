import React from "react"
import SubSectionButton from "../components/SubSectionButton"

export default function SubSectionButtons({ titles, currentView, setView }) {
    return (
        <div className="flex m-4">
            {titles.map(e => (
                <SubSectionButton
                    key={e}
                    title={e}
                    setView={setView}
                    active={currentView === e}
                />
            ))}
        </div>
    )
}
