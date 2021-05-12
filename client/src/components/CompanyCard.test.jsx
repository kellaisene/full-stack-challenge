import { render, fireEvent } from '@testing-library/react';
import CompanyCard from './CompanyCard';

it('checkCompanyLIstRender', () => {
    const { queryByTitle } = render(<CompanyCard />)
    const companyCard = queryByTitle("companies-card")
    console.log('COMPANYCARD TEST', companyCard)
    // expect(companyCard).toBe()
})
