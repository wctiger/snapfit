import StyledPaper from '../../components/StyledPaper';

const Preview = () => {
    return (
        <StyledPaper className="justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h5 className="text-2xl font-semibold">Print Preview</h5>
                <p className="text-base">
                    To preview the printed image on actual photo paper, kindly upload a photo from the left panel.
                </p>
            </div>
        </StyledPaper>
    );
};

export default Preview;
