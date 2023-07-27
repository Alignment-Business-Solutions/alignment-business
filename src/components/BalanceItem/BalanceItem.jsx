

function BalanceItem({balance}) {

    return (
        <>
        <td>{balance.beginning_cash}</td>
        <td>{balance.income_received}</td>
        <td>{balance.income_received}</td>
        <td>{balance.expenses_paid}</td>
        <td>{balance.expenses_expected}</td>
        <td>{balance.to_from_savings}</td>
        <td>{balance.saving_balance}</td>
        <td>{balance.outstanding_checks}</td>
        <td>{balance.loan_to_from}</td>
        <td>{balance.ending_balance_cleared}</td>
        <td>{balance.ending_balance_actual}</td>
       
    </>)
}

export default BalanceItem