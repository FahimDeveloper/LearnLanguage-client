import Marquee from "react-fast-marquee";
import useTheme from "../../../../../Hooks/useTheme";

const Languages = ({ countries }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'} py-5`}>
            <div className="container mx-auto space-y-10">
                <h2 className='titleStyle'>provide many languages</h2>
                <Marquee speed={70}>
                    {
                        countries.map((country, index) => {
                            return (
                                <div key={index} className="text-center mx-3">
                                    <img src={country.flag} className="h-24 w-40 object-cover border" alt="" />
                                    <p className="font-semibold">{country.name}</p>
                                </div>
                            )
                        })
                    }
                </Marquee>
            </div >
        </div>
    );
};

export default Languages;