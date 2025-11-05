import InfoBox from "./InfoBox";

const InfoBoxes = () => {
    return <div> <section>
        <div className="container-xl lg:container m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                <InfoBox
                    heading='For Renters'
                    backgroundColor="bg-gray-100"
                    buttonInfo={{
                        text: 'Browse Properties',
                        link: '/properties',
                        backgroundColor: '#800080'
                    }}
                >
                    Find your dream rental property. Bookmark properties and contact
                    owners.
                </InfoBox>

                <InfoBox
                    heading='Premium Services'
                    backgroundColor=""
                    textColor="text-gray-800"
                    buttonInfo={{
                        text: 'Book a Viewing',
                        link: '/book-view',
                        backgroundColor: '#800080'
                    }}
                    customStyle={{ backgroundColor: '#E6B3E6' }}
                >
                    Schedule personalized property tours and get expert guidance
                    from our professional team.
                </InfoBox>

               
            </div>
        </div>
    </section>
        </div>
}

export default InfoBoxes;