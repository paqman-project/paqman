export default function App() {
    return (
        <div className="h-full w-full absolute top-1/4">
            <div className="flex justify-middle">
                <div className="bg-blue-500 h-4 w-16 mx-auto animate-spin rounded-lg"></div>
                <div className="bg-yellow-500 h-4 w-16 mx-auto animate-spin rounded-lg"></div>
                <div className="bg-green-500 h-4 w-16 mx-auto animate-spin rounded-lg"></div>
            </div>
            <h1 className="w-1/2 mx-auto mt-20 p-2 border-4 text-center text-red-900 font-bold border-red-500 rounded-full animate-bounce">
                Something big is happening here
            </h1>
            <footer>
                <p className="text-center mt-6">
                    &copy; PAQMAN project team, 2021
                </p>
            </footer>
        </div>
    )
}