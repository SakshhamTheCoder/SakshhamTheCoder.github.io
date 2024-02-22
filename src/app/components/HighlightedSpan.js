const HighlightedSpan = ({ children }) => {
    return (
        <span
            key={children}
            className="inline-flex text-primary bg-[#DA003740] backdrop-blur-sm rounded-3xl p-4 mt-1 sm:mt-4"
        >
            {children}
        </span>
    );
};

export default HighlightedSpan;
