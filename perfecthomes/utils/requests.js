const apiDomain  = process.env.NEXT_PUBLIC_API_DOMAIN || null;


async function fetchProperties() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:3000/api');
        
        const res = await fetch(`${apiUrl}/properties`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!res.ok){
            console.error('Fetch error:', res.status, res.statusText);
            return { properties: [] };
        }

        const data = await res.json();
        return data || { properties: [] };

    } catch (error){
        console.error('Fetch properties error:', error);
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