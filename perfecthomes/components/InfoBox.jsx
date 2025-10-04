'use client'
const InfoBox = ({
    heading,
    backgroundColor = 'bg-gray-100',
    textColor = 'text-gray-800',
    buttonInfo,
    children,
    customStyle
}) => {
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`} style={customStyle}>
        <h2 className={`${ textColor } text-2xl font-bold`}>{ heading }</h2>
        <p className={`${textColor} mt-2 mb-4`}>
          {children}
        </p>
        <a
          href={ buttonInfo.link}
          className={`inline-block text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105`}
          style={{ 
            backgroundColor: buttonInfo.backgroundColor.startsWith('#') ? buttonInfo.backgroundColor : undefined,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            if (buttonInfo.backgroundColor.startsWith('#')) {
              e.target.style.backgroundColor = '#660066'
            }
          }}
          onMouseLeave={(e) => {
            if (buttonInfo.backgroundColor.startsWith('#')) {
              e.target.style.backgroundColor = buttonInfo.backgroundColor
            }
          }}
        >
          { buttonInfo.text}
        </a>
      </div>
    )
}

export default InfoBox;