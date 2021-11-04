import "./Breadcrumbs.css"

const Breadcrumbs = (props) => {
    const getDivider = () => props.divider ? props.divider : <>/</>

    const getCrumbs = () => {
        return props.crumbList.map((crumb, index) => {
            return (
                <li key={index}>
                    <a key={index}
                       href={crumb.href} >{crumb.text}</a>
                    {index < props.crumbList.length - 1 ? getDivider() : null}
                </li>
            )
        })
    }
    return (<ul className={"breadcrumbs"}>{getCrumbs()}</ul>)
}

export default Breadcrumbs