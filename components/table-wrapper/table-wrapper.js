
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    CircularProgress,
} from "@mui/material";

function TableWrapper({ tableStyle, containerStyle, spanTd, message, isLoading, isContent, children, thContent, ...props }) {
    return (
        <TableContainer sx={containerStyle}>
            <Table sx={[tableStyle, {
                '& .MuiTableCell-root': {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                }
            }]}
                {...props}
            >
                <TableHead>
                    <TableRow sx={{
                        backgroundColor: "#E6F5FE", '& th': {
                            paddingTop: "15px !important",
                            paddingBottom: "15px !important",
                            fontWeight: 'bold'
                        }
                    }}>
                        {thContent}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={spanTd} align="center">
                                <CircularProgress size={22} />
                            </TableCell>
                        </TableRow>
                    ) : isContent ? (
                        children
                    ) : (
                        <TableRow>
                            <TableCell colSpan={spanTd} align="center">
                                <Typography variant="caption1">{!!message ? message : 'No Records Found'}</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
TableWrapper.defaultProps = {
    tableStyle: {},
    spanTd: '1',
    message: null,
    isContent: false,
    isLoading: false
}
export default TableWrapper;