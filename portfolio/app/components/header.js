export default function Header()
{
    return (
        <div className="bg-black text-white flex flex-row items-center justify-between px-10 py-4" >
            <img width={"300px"} src="https://media.licdn.com/dms/image/v2/D5612AQF2a3w6KSWWdA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1675007152298?e=2147483647&v=beta&t=yiHyMxJ8zPL5_gfLv6YwU46FhhPwmB1YCv0duA390SY" alt="Profile" />
            <div className="flex flex-row space-x-4">
            <p>Solutions</p>
            <p>Products</p>
            <p>About Us</p>
            <p>Portfolio Companies</p>
            </div>
            <div className="flex flex-row space-x-4">
                <p>Careers</p>
            <p>Blogs</p>
            <p>Shareholder Relations</p>
            <p>Contact Us</p>
            </div>
        </div>
    )
}