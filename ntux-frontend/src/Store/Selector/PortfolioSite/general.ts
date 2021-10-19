import { mockSiteData } from '../../../Models/mockData/portfolioSite';
import { SectionItem } from '../../../Models/PortfolioSite';

export const selectPortfolioAllData = () => {
  const arrayed: SectionItem[] = Object.keys(mockSiteData).map((key) => ({
    ...mockSiteData[key],
    sectionName: key,
  }));
  arrayed.sort((a, b) => (a?.setting?.order || 0) - (b?.setting?.order || 0));
  return arrayed;
};
