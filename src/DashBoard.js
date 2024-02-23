import Header from "./Header";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileSliderbar from "./MobileSliderbar";
import Slidebar from "./Slidebar";

function Dashboard({ id }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (

        <div className="d-flex flex-column">
            <div>
                <Header id={id} />
            </div>

            {isMobile && (

                <div className="d-flex">
                    <MobileSliderbar />
                </div>
            )}

            <div>
                <div class="d-flex">
                    {!isMobile && (

                        <div className="d-flex mb-5">
                            <Slidebar />
                        </div>
                    )}

                    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ width: "85%" }}>
                        <h1>Dashboard</h1>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Dashboard