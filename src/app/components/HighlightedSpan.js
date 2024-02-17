const HighlightedSpan = ({ children }) => {
    return (
        <span className="inline-flex text-primary bg-[#DA003740] backdrop-blur-lg rounded-3xl p-4 m-4">{children}</span>
    );
};

export default HighlightedSpan;
