import './table.css'

interface TableProps {
    children: React.ReactNode;
    firstRowArray: Array<string>;
}

const Table: React.FC<TableProps> = ({ children, firstRowArray }) => {

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        {
                            firstRowArray.map((firstRowItem, index) => <th key={index}>{firstRowItem}</th>
                            )}
                    </tr>
                    {children}
                </tbody>
            </table>
        </>
    )
}

export default Table;