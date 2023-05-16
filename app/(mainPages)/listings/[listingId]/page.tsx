import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingsById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string
}
const ListingPage = async({params}: {params: IParams}) => {
    const currentUser = await getCurrentUser();
    const listing = await getListingById(params);
    const reservation = await getReservations(params);
if(!listing) {
    return (
        <ClientOnly>
            <EmptyState/>
        </ClientOnly>
    )
}    
  return (
  <ClientOnly>
    <ListingClient
    reservations={reservation}
    listing={listing}
    currentUser={currentUser}
    />
  </ClientOnly>
  )
  ;
};

export default ListingPage;
