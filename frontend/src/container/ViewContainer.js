import React from "react"

/**
 * This component is used to wrap the views and pages to fit the
 * header and sidebar.
 * @param props
 * @param props.sidebarCollapsed If PAQMANs sidebar is collapsed or not
 */
export default function ViewContainer({ sidebarCollapsed, children }) {
    return (
        <div className={`mt-16 ${sidebarCollapsed ? "ml-0" : "md:ml-56 ml-40"}`}>
            {children}
        </div>
    )
}
