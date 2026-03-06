export type CreatorFilterProps = {
  creatorName: string;
  setCreatorName: (v: string) => void;
  creatorNameList: string[];
  setCreatorList: React.Dispatch<React.SetStateAction<string[]>>;
};