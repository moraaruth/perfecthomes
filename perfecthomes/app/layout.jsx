import '@/assets/styles/globals.css'


export const metadata = {
    title: 'PerfectHomes | Find your Perfect Home',
    description: 'Find your dream home',
    keywords: 'rentals, find rentals, find property',
}
const MainLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div>{children}</div>
            </body>


        </html>
    )
}

export default MainLayout;