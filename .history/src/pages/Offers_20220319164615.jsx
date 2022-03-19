import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingsRef = collection(db, 'listings')

                // Create a query
                const q = query(
                    listingsRef, 
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                // Execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)

                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Không tìm thấy dữ liệu nào')
            }
        }

        fetchListings()
    }, [])

    // Pagination / Load More
    const onFetchMoreListings = async () => {
        try {
            // Get reference
            const listingsRef = collection(db, 'listings')

            // Create a query
            const q = query(
                listingsRef, 
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(5)
            )

            // Execute query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)

            const listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            
            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error('Không tìm thấy dữ liệu nào')
        }
    }

    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    Giảm Giá
                </p>
            </header>

            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='categoryListings'>
                            {listings.map((listing) => (
                                <ListingItem 
                                    listing={listing.data}
                                    id={listing.id}
                                    key={listing.id}
                                />
                            ))}
                        </ul>
                    </main>

                    <br />
                    <br />
                    {lastFetchedListing && (
                        <p className="loadMore" onClick={onFetchMoreListings}></p>
                    )}
                </>
            ) : (
                <p>Hiện tại không có ưu đãi</p>
            )}
        </div>
    )
}

export default Offers

