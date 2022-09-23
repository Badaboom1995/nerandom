import tw from "tailwind-styled-components";

const Container: any = tw.div`
    bg-white 
    flex
    flex-col
    rounded-xl 
    border
    border-slate-200
    relative
    pb-10
`;
const Header: any = tw.div`
   flex
   flex-col
   items-center
   p-2
   border-b
`;
const HeaderInfo: any = tw.div`
   flex
   flex-col
   w-full
   text-center
   
`;
const AvatarWrapper: any = tw.div`
   w-[75px]
   h-[75px]
    rounded-full
    overflow-hidden
   mb-4
   mr-2
`;
const Avatar: any = tw.img`
   w-full
   rounded-full
   
`;
const Name: any = tw.p`
   text-2xl
   max-w-2
   font-medium
   overflow-hidden
   text-ellipsis
   mb-3
   
`;
const Occupation: any = tw.div`
   flex
   flex-wrap
   justify-center
   mb-2
`;
const OccupationItem: any = tw.span`
   block 
   border
   border-black
   text-black
   px-2
   py
   mr-2
   mb-2
   whitespace-nowrap
   rounded-lg
`;
const Telegram: any = tw.span`
  text-2xl
  text-orange-500
`;
const Tags: any = tw.div`
   flex
   flex-wrap
   p-2
   px-5
   w-full
   
`;
const TagsWraper: any = tw.div`
   flex-wrap
   border
`;

const TagItem: any = tw.span`
  text-white
  text-sm
  font-medium
  m-1
  whitespace-nowrap
  bg-yellow-200
  rounded
  p-1
`;
export {
  Header,
  HeaderInfo,
  Avatar,
  AvatarWrapper,
  Name,
  Tags,
  TagsWraper,
  TagItem,
  OccupationItem,
  Occupation,
  Telegram,
  Description,
  Container,
};

const Description: any = tw.p`
  p-5
  overflow-y-scroll
  grow
  
`;
