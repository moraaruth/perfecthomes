const apiDomain  = process.env.NEXT_PUBLIC_API_DOMAIN || null;


async function fetchProperties() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000/api'}/properties`, {
            cache: 'no-store'
        });

        if(!res.ok){
            throw new Error('Failed to fetch data');
        }

        return res.json();

    } catch (error){
        console.log(error);
        return { properties: [] };

    }
}

//fetch single property
async function fetchProperty(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000/api'}/properties/${id}`);

        if(!res.ok){
            throw new Error('Failed to fetch data');
        }

        return res.json();

    } catch (error){
        console.log(error);
        return null;

    }
}

export { fetchProperties, fetchProperty }