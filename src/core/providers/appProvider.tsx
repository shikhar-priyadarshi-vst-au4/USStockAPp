import { createContext, useState } from "react";
import useArticles, { Articles, Status } from "../hook/useFetch";

export const SORT_BY = {
    date: "date",
    title: "title"
} as const;

export const SORT_DIRECTION = {
    ASC: "ASC",
    DESC: "DESC"
} as const;

const sortByVal = Object.values(SORT_BY);
const sortDirVal = Object.values(SORT_DIRECTION); 

const filterMap = {
    categoryFilter: "source",
    authorFilter: "author"
}

export interface Pagination{
    pageIndex: number;
    pageTotal: number;
    pageLimit: number;
}

interface AppContext{
    status?: Status;
    originalData?: Array<Record<string, string>>;
    operationalData?: Array<Record<string, string>>;
    categoryFilter?: string;
    authorFilter?: string;
    categories?: Array<string>;
    authors?: Array<string>;
    pagination?: Pagination;
    sortBy?: keyof typeof SORT_BY;
    sortDirection?: keyof typeof SORT_DIRECTION; 
    sortByVal?: Array<string>,
    sortDirVal?: Array<string>,
    setSorting?:  React.Dispatch<React.SetStateAction<{
        sortBy: keyof typeof SORT_BY;
        sortDirection: keyof typeof SORT_DIRECTION;
    }>>;
    setFilters?:  React.Dispatch<React.SetStateAction<{
        categoryFilter: string;
        authorFilter: string;
    }>>;
    setPagination?: React.Dispatch<React.SetStateAction<Pagination>>;
    onPageChange?: (pageNo: number) => void;
}

interface AppProviderWrapper{
    children: React.ReactNode    
}

interface AppFilter{
    categoryFilter: string;
    authorFilter: string;
}

interface AppSorting{
    sortBy: keyof typeof SORT_BY,
    sortDirection: keyof typeof SORT_DIRECTION
}

export const appContext = createContext<AppContext>({});

function filterBy(originalData: Articles, filtering: AppFilter): Articles{
    return originalData.filter((data: Record<string, string>) => {
        return Object.keys(filtering).every((key) => {
            if(filtering[key]){
                return filtering[key] == data[filterMap[key]]
            }
            return true;
        })
    })
}

function sortBy(originalData: Articles, sorting: AppSorting){
    return originalData.sort((a,b) => {
        let tempA, tempB;
        if(sorting.sortBy == SORT_BY.date){
            tempA = new Date(a.date);
            tempB = new Date(b.date);
        }
        else if(sorting.sortBy == SORT_BY.title){
            tempA = a.title;
            tempB = b.title;
        }

        if(tempA > tempB) 
            return sorting.sortDirection == SORT_DIRECTION.DESC ? -1 : 1;
        if(tempA < tempB)
            return sorting.sortDirection == SORT_DIRECTION.DESC ? 1 : -1;
        if(tempA == tempB)
            return 0;
    })
}

function paginationBy(originalData: Articles, pagination: Pagination){
    const startIndex = (pagination.pageIndex - 1)*pagination.pageLimit;
    const endIndex = startIndex + pagination.pageLimit;
    return originalData.slice(startIndex, endIndex);
}

export const AppProviderWrapper = ({children}: AppProviderWrapper) => {
    const [sorting, setSorting] = useState<AppSorting>({
        sortBy: SORT_BY.date,
        sortDirection: SORT_DIRECTION.DESC
    })

    const [filters, setFilters] = useState<AppFilter>({
        categoryFilter: '',
        authorFilter: ''
    })

    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 1,
        pageTotal: 0,
        pageLimit: 5
    }) 
    const { status, articles, categories, authors } = useArticles(setPagination);
    
    const filteredData = filterBy(articles, filters);

    const sortedData = sortBy(filteredData, sorting);

    const operationalData = paginationBy(sortedData, pagination);
    

    const onPageChange = (pageNo: number) => setPagination((previous) => ({
        ...previous,
        pageIndex: pageNo
    })) 


    return <appContext.Provider value={{
        status,
        originalData: articles,
        operationalData,
        categories,
        authors,
        ...sorting,
        ...filters,
        sortByVal,
        sortDirVal,
        pagination,
        onPageChange,
        setSorting,
        setFilters
    }}>
        {children}
    </appContext.Provider>
}