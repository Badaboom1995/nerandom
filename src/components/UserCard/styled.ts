import tw from "tailwind-styled-components";

const Container: any = tw.div`
    bg-white 
    flex
    flex-col
    rounded-xl 
    border
    border-slate-200
    h-[600px]
    relative
    pb-10
`;
const Header: any = tw.div`
   flex
   flex-col
   items-center
   p-5
`;
const HeaderInfo: any = tw.div`
   flex
   flex-col
   w-full
   text-center
   
`;
const AvatarWrapper: any = tw.div`
   w-[150px]
   h-[150px]
   mb-4
   overflow-hidden
   rounded-full
`;
const Avatar: any = tw.img`
   w-30
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
   p-2
   px-5
   w-full
   bg-zinc-800
`;
const TagsWraper: any = tw.div`
   overflow-x-scroll
`;

const TagItem: any = tw.span`
  text-white
  text-md
  font-medium
  whitespace-nowrap
  mr-6
`;
const Description: any = tw.p`
  p-5
  overflow-y-scroll
  grow
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
