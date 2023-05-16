'use client'
import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
const router = useRouter();
  return (
    <>
    <div className="bg-gray-100 w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
    onClick={router.back}
    >
        <BiArrowBack className="text-gray-600 font-bold text-[20px]"/>
    </div>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          alt='image'
          src={imageSrc}
          fill
          priority
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
