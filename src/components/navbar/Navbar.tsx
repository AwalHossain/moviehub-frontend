import NavState from "./NavState";


const Navbar = async () => {

    // const { registration, login } = dictionary;

    return (
        <nav className="absolute top-0 left-0 right-0  px-2 md:px-6 py-4 z-[999]">
            <div className="flex items-center justify-between space-x-6">
                <div className="w-full">
                    {/* Pass dictionary.navLink and dictionary.profile as locale */}
                    <NavState />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
