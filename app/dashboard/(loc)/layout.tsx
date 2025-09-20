import { AddLocProvider } from "@/context/addLocContext"

function LocLayout({children}:{children:React.ReactNode}){
    return <>
        <AddLocProvider>
            {children}
        </AddLocProvider>
    </>
}
export default LocLayout