export const Home = () => {
    return (
        <header class="bg-gradient-to-tr from-purple-500 to-blue-500 text-white min-h-screen flex justify-center items-center">
            <div class="container mx-auto px-10 md:px-0 text-center md:text-left">
                <h1 class="capitalize mb-4 text-5xl font-bold">
                    welcome to schats
                </h1>

                <p class="md:w-1/2 mb-12 text-lg leading-relaxed tracking-wide">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    sed totam optio hic rerum pariatur error illo quae sunt!
                    Veritatis rerum reiciendis magni accusantium repellat enim
                    voluptate. Optio, distinctio numquam.
                </p>

                <a
                    href="/rooms"
                    class="border tracking-wide rounded-full py-3 px-8 font-bold uppercase bg-white hover:shadow-2xl text-purple-900 transition "
                >
                    create a new room
                </a>
            </div>
        </header>
    );
};
