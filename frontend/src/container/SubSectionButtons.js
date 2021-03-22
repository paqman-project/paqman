import React from "react"
import SubSectionButton from "../components/SubSectionButton"

export default function SubSectionButtons({ titles, setView }) {
    return (
        <div className="flex bg-red-200 m-4 object-center">
            {titles.map(e => <SubSectionButton key={e} title={e} setView={setView} />)}
        </div>
    )
}