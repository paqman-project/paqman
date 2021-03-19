import SubSectionButton from "../components/SubSectionButton"

export default function SubSectionButtons({ titles, setView }) {
    return (
        <div className="flex">
            {titles.map(e => <SubSectionButton key={e} title={e} setView={setView} />)}
        </div>
    )
}