import { useContext, useState } from "react";
import "./layout.scss";
import { appContext, SORT_BY, SORT_DIRECTION } from "../core/providers/appProvider";
import GroupCheckbox from "../components/GroupCheckbox";
import ArticleCard from "../components/Card";
import Pagination from "../components/Pagination";
export default function UILayout(){
    const appStore = useContext(appContext)
    const [open, setOpen] = useState(true);
    return <>
    <div className="hamburger" onClick={() => setOpen(!open)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16ZM18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H18ZM18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" fill="#1C274C"/>
        </svg>
    </div>
    <section className="container layout">
    <aside className={`layout-sidebar ${open ? "" : "layout-sidebar-mobile_inactive"}`}>
        <GroupCheckbox 
            label="Category"
            values={appStore.categories}
            selectedValue={appStore.categoryFilter}
            setSelectedValue={(value: string) => {
                appStore.setFilters((previous) => ({
                    ...previous,
                    categoryFilter: value
                }))
            }}
            />
        <GroupCheckbox 
            label="Author"
            values={appStore.authors}
            selectedValue={appStore.authorFilter}
            setSelectedValue={(value: string) => {
                appStore.setFilters((previous) => ({
                    ...previous,
                    authorFilter: value
                }))
            }}
            />
        <GroupCheckbox 
            label="Sort By"
            values={appStore.sortByVal}
            toggleValues={appStore.sortDirVal}
            selectedValue={appStore.sortBy}
            toggleSelectedValue={appStore.sortDirection}
            setSelectedValue={(value: keyof typeof SORT_BY) => {
                appStore.setSorting((previous) => ({
                    ...previous,
                    sortBy: value
                }))
            }}
            setToggleSelectedValue={(value: keyof typeof SORT_DIRECTION) => {
                appStore.setSorting((previous) => ({
                    ...previous,
                    sortDirection: value
                }))
            }}
            />
            <button className="layout-sidebar-close" onClick={() => setOpen(false)}>Close</button>
    </aside>
    <main className="layout-main">
        {appStore.operationalData.map((data, index) => <>
        <ArticleCard
            key={index}
            articleDate={data.date}
            articleSource={data.source}
            articleTitle={data.title}
            articleAuthor={data.author}
            articleBody={data.body}
            imageBaseUrl="https://dummy-rest-api.specbee.site/"
            imageSrc={data.image}
            imageAlt={data.title}
            />
        </>)}
        {!appStore.status.loading && appStore.operationalData.length == 0 && <div className="layout-nodata">No result found for Selection</div>}
        <br/>
        {!appStore.status.loading && appStore.operationalData.length > 0 && 
        <Pagination
            pagination={appStore.pagination}
            onPageChange={appStore.onPageChange}/>}
    </main>
    </section>
    </>
}