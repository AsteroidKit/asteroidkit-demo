import { useFloatingMenuState } from "../FloatingMenuProvider/FloatingMenuProvider";

import styles from "../../styles/FloatingMenu.module.css";

import Toggle from 'react-toggle';

const isEnabled = (wallets: any, name: string) => {
    return wallets.filter((wallet: any) => wallet.name === name && wallet.enabled === true).length > 0;
}

type ThemeOptionIcon = {
    light: string;
    dark: string;
    everforest: string;
}

type WalletOptionIcon = {
    metamask: string;
    coinbase: string;
    ledger: string;
    argent: string;
}

const ThemeSelector = ({ name }: any) => {
    const { color, updateColor } = useFloatingMenuState();

    const icons: ThemeOptionIcon = {
        "light": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA1CAYAAAAd84i6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVYSURBVHgB1VtrUttWFD56+CUMtgHbMNMUM9P/ZQnJCpKuoNlBmhWE7KBZQWAF7RLYQelMZzqTyQQzMDV+Bdv4bUvq+WTkyA/QyzHSNwOWrmRJn853z+Pea4EewcXFRTqZ3Hqj6/pzXRcKRHqBAgZBoAY/W5E/zwVBO81ms2ePnr+ssVQqFSQp8lHX6TmFD0VN097v7+dOlh1cIFyp1N+wJY+ZbJpCDEEQTjod8e3hYaYx027dKZfr70DW2haJRCgWi/KnTKIoUtDA3Y3GY5UGgyGNRiNi61qOCufdrvjCSnpKGJblL/9u7oNcMrlhEA0LQLbfH1Cv15+2cd8+y+V2X0z38e++z/5lyliSJEqlNiELCiO63T6T7k33dV17u7eXM4xpaFQUI9M+C8uGmSygKHFKJBLTfUEQ311c3E74wbr8+at5MOxkTYA0/M890ooy/g0bsiBIr8zWaDS61DFV63V2CGMKKiRJpO1MhiLyrL9JJOKGI5tAgFGPZSb4kuVsIBqNLFzsa6Nh9Id0OkVBBUhdXl3TT4eFmXY4XKhVnxAsQM14JUfmCbIsLVys3+9TOpWiTGqLgozbRotG4/GClWXeN63Mxj2SrQkGvLMd4PpnY50zyPJqwluduxdCz+Zmkra27I0AuZuq1jQh7eopWq0W3dyUyQvgQA4OfvSVvOD+9fpXY7vT6RjXtHpjJ3B193a7TV4BWXW7PfKDbrf76L4TuLLwzs6O4a29ShqZmx+k2Je0WnfG9iRfcO9IXRGOxWKGLJ8KkC/uD6WgD3vxC+FJlO+Bl46/eWiaSpID/2BLeENRqFqre+ov68KQ/YMSTzhyiLaEU+z64/xG+4MBBRWQ+mYy6ehcR5J+SEZhhCPCRp0ZYAuj7zo1iC1hhKGr62sjYwniiAeAZ0xtbRph0w62hGv1Gu1sp2l7O0NBhcoK/Pz5C2W4YrIziiOTiaJ9jr0uoHtZRzMASBrP6CQhchWHIR0k716AgUBYwA9w/8vLS4OY19zcFeFqtcL5dIe8Ih6Pu072rWg0bqdWRG7ebDZdv0RXr8dvaLIMuXjCvDWdlLPzcF08KJx5fRs2cY5EQvFdE8OakDX6cDLprB6eh+sngCT9yNIPYOG9vTz5gS1hyAbDPKORQkGFqTgnCrI9Y5dlXK5UqXh5RUFGLpd1dJ4tYcho36eMgoRg5orfEY6LB9XDsM66MMm0nNnOUfHwhbMbLzFvXdBUlUNWmrKrKB6qXDzscuGQy9pf7KkA9X3i4mFnVcWD3wxplUD3Go9n57nM4kH9HsUD8llVdd+fFSXhKTOav/811+aIu2spHlApYfTfC/A9LzMFVuBlm0nGWooHv8sfQlk8oMRT2Su6BciuonjAIDyKh42NjfUUD7jRUwEWfvbsB/ID1ohQNHeWDZGYxUOQgelTxOLIEgVZHawsC0WeH9b+5lnyAhqGwxFLdrbI305n6L+bG/rn308UVKC75JcUD5j5t9bu7bZ8zq9EP2Mrv0TDcDhcIAxHdeBTRk8FGNCEIOjnWKAmxmKREyzQRCPi3HxQDzOs89Gqqn/Ap8ier8Fd99Q8cHfX8TT/GzRg8s/Co8iUz7BhBLZYTDo2rYyTms27UJPG0sNe79vU0GR17X4R2wZhWJlN/ovlBIM0FmyGCXhurBCwSpn91gfrUuKZJXelUu01h7qP1jbEPjgyc81T0FbpTTzx2HC4SxbPnebzu6+tDUvWS1eOdF38gzcLFGro7/P57PF864Mr4jlMs7WN5XoFChHY4Gdsde6zy38KYKvPcrn2Cj8FYGX/PPndQ+DAzlY/RwKl6+qfpnN6CP8DK6VF3I60PcYAAAAASUVORK5CYII=",
        "dark": "data:image/png;base64,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",
        "everforest": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODciIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCA4NyA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI4My42OTk1IiBoZWlnaHQ9Ijc0LjE2MjYiIHJ4PSIxMC41IiBmaWxsPSIjMkYzODNFIiBzdHJva2U9IiNFOUU5RUMiIHN0cm9rZS13aWR0aD0iMyIvPgo8cmVjdCB4PSIxMi4xMzY3IiB5PSI0OS40MTg5IiB3aWR0aD0iNjIuNDIzNiIgaGVpZ2h0PSIxNC43Mzg5IiByeD0iMiIgZmlsbD0iIzQwNEM1MSIvPgo8cmVjdCB4PSIxMi42MzY3IiB5PSI0OS45MTg5IiB3aWR0aD0iNjEuNDIzNiIgaGVpZ2h0PSIxMy43Mzg5IiByeD0iMS41IiBzdHJva2U9IiNEM0Q2RDgiIHN0cm9rZS1vcGFjaXR5PSIwLjUxIi8+CjxyZWN0IHg9IjE2LjQ3MjciIHk9IjU0LjYyMTEiIHdpZHRoPSIyMy40MDg5IiBoZWlnaHQ9IjQuMzM0OTgiIHJ4PSIxLjUiIGZpbGw9IiNGNUY3RjgiLz4KPGNpcmNsZSBjeD0iNjYuMzIzNSIgY3k9IjU2Ljc4ODQiIHI9IjMuMDM0NDgiIGZpbGw9IiNGNUY3RjgiLz4KPHJlY3QgeD0iMTIuMTM2NyIgeT0iMTIuMTM4MiIgd2lkdGg9IjYyLjQyMzYiIGhlaWdodD0iMTQuNzM4OSIgcng9IjIiIGZpbGw9IiM0MDRDNTEiLz4KPHJlY3QgeD0iMTIuNjM2NyIgeT0iMTIuNjM4MiIgd2lkdGg9IjYxLjQyMzYiIGhlaWdodD0iMTMuNzM4OSIgcng9IjEuNSIgc3Ryb2tlPSIjRDNENkQ4IiBzdHJva2Utb3BhY2l0eT0iMC41MSIvPgo8cmVjdCB4PSIxNi40NzI3IiB5PSIxNy4zNDAzIiB3aWR0aD0iMjMuNDA4OSIgaGVpZ2h0PSI0LjMzNDk4IiByeD0iMS41IiBmaWxsPSIjRjVGN0Y4Ii8+CjxjaXJjbGUgY3g9IjY2LjMyMzUiIGN5PSIxOS41MDc2IiByPSIzLjAzNDQ4IiBmaWxsPSIjRjVGN0Y4Ii8+CjxyZWN0IHg9IjEyLjEzNjciIHk9IjMwLjM0NDciIHdpZHRoPSI2Mi40MjM2IiBoZWlnaHQ9IjE0LjczODkiIHJ4PSIyIiBmaWxsPSIjNDA0QzUxIi8+CjxyZWN0IHg9IjEyLjYzNjciIHk9IjMwLjg0NDciIHdpZHRoPSI2MS40MjM2IiBoZWlnaHQ9IjEzLjczODkiIHJ4PSIxLjUiIHN0cm9rZT0iI0QzRDZEOCIgc3Ryb2tlLW9wYWNpdHk9IjAuNTEiLz4KPHJlY3QgeD0iMTYuNDcyNyIgeT0iMzUuNTQ2OSIgd2lkdGg9IjIzLjQwODkiIGhlaWdodD0iNC4zMzQ5OCIgcng9IjEuNSIgZmlsbD0iI0Y1RjdGOCIvPgo8Y2lyY2xlIGN4PSI2Ni4zMjM1IiBjeT0iMzcuNzE0MiIgcj0iMy4wMzQ0OCIgZmlsbD0iI0Y1RjdGOCIvPgo8L3N2Zz4K",
    }

    return (
        <button className={styles.insideButton} onClick={() => updateColor(name)}>
            { color === name && 
                <div className={styles.insideButtonHover}>
                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCAzMSAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjQ3MDQgMi41NzgzN0MxMi45MjA2IDIuNTc4MzcgMTAuNDI4IDMuMzM0NDkgOC4zMDc4NSA0Ljc1MTExQzYuMTg3NzIgNi4xNjc3NCA0LjUzNTI5IDguMTgxMjQgMy41NTk1IDEwLjUzN0MyLjU4MzcxIDEyLjg5MjggMi4zMjg0IDE1LjQ4NSAyLjgyNTg1IDE3Ljk4NThDMy4zMjMzIDIwLjQ4NjcgNC41NTExOCAyMi43ODM5IDYuMzU0MiAyNC41ODY5QzguMTU3MjIgMjYuMzg5OSAxMC40NTQ0IDI3LjYxNzggMTIuOTU1MyAyOC4xMTUyQzE1LjQ1NjEgMjguNjEyNyAxOC4wNDgzIDI4LjM1NzQgMjAuNDA0MSAyNy4zODE2QzIyLjc1OTkgMjYuNDA1OCAyNC43NzM0IDI0Ljc1MzQgMjYuMTkgMjIuNjMzMkMyNy42MDY2IDIwLjUxMzEgMjguMzYyNyAxOC4wMjA1IDI4LjM2MjcgMTUuNDcwN0MyOC4zNjI3IDEzLjc3NzYgMjguMDI5MyAxMi4xMDEyIDI3LjM4MTQgMTAuNTM3QzI2LjczMzUgOC45NzI4MyAyNS43ODM4IDcuNTUxNiAyNC41ODY3IDYuMzU0NDRDMjMuMzg5NSA1LjE1NzI4IDIxLjk2ODMgNC4yMDc2NCAyMC40MDQxIDMuNTU5NzRDMTguODM5OSAyLjkxMTg0IDE3LjE2MzUgMi41NzgzNyAxNS40NzA0IDIuNTc4MzdaTTIxLjAxNDEgMTIuMzg5NEwxNS4xMjIzIDIwLjEyNDhDMTUuMDAyMiAyMC4yODA4IDE0Ljg0OCAyMC40MDcyIDE0LjY3MTQgMjAuNDk0NEMxNC40OTQ5IDIwLjU4MTYgMTQuMzAwNyAyMC42MjcxIDE0LjEwMzggMjAuNjI3NkMxMy45MDggMjAuNjI4NiAxMy43MTQ1IDIwLjU4NTEgMTMuNTM4MSAyMC41MDAyQzEzLjM2MTYgMjAuNDE1MyAxMy4yMDY4IDIwLjI5MTMgMTMuMDg1NCAyMC4xMzc3TDkuOTM5NjMgMTYuMTI4MkM5LjgzNTUxIDE1Ljk5NDQgOS43NTg3NSAxNS44NDE1IDkuNzEzNzQgMTUuNjc4MUM5LjY2ODczIDE1LjUxNDYgOS42NTYzNCAxNS4zNDQgOS42NzcyOSAxNS4xNzU4QzkuNjk4MjQgMTUuMDA3NiA5Ljc1MjEyIDE0Ljg0NTEgOS44MzU4NCAxNC42OTc4QzkuOTE5NTcgMTQuNTUwNCAxMC4wMzE1IDE0LjQyMDkgMTAuMTY1MiAxNC4zMTY4QzEwLjQzNTQgMTQuMTA2NSAxMC43NzggMTQuMDEyMiAxMS4xMTc3IDE0LjA1NDVDMTEuMjg1OSAxNC4wNzU0IDExLjQ0ODMgMTQuMTI5MyAxMS41OTU3IDE0LjIxM0MxMS43NDMgMTQuMjk2NyAxMS44NzI1IDE0LjQwODcgMTEuOTc2NiAxNC41NDI0TDE0LjA3ODEgMTcuMjI0TDE4Ljk1MTQgMTAuNzc3OUMxOS4wNTQ2IDEwLjY0MjQgMTkuMTgzNiAxMC41Mjg3IDE5LjMzMDggMTAuNDQzQzE5LjQ3ODEgMTAuMzU3NCAxOS42NDA3IDEwLjMwMTcgMTkuODA5NSAxMC4yNzg5QzE5Ljk3ODMgMTAuMjU2MiAyMC4xNSAxMC4yNjY5IDIwLjMxNDYgMTAuMzEwNUMyMC40NzkzIDEwLjM1NDEgMjAuNjMzNyAxMC40Mjk2IDIwLjc2OTIgMTAuNTMyOUMyMC45MDQ2IDEwLjYzNjIgMjEuMDE4NCAxMC43NjUxIDIxLjEwNCAxMC45MTI0QzIxLjE4OTYgMTEuMDU5NiAyMS4yNDU0IDExLjIyMjMgMjEuMjY4MSAxMS4zOTExQzIxLjI5MDkgMTEuNTU5OSAyMS4yODAxIDExLjczMTUgMjEuMjM2NiAxMS44OTYyQzIxLjE5MyAxMi4wNjA4IDIxLjExNzQgMTIuMjE1MyAyMS4wMTQxIDEyLjM1MDdWMTIuMzg5NFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
                </div>
            }

            <img style={
                    color === name ? {filter: "opacity(0.3)"} : {filter: "opacity(1)"}
                } alt="" width="60" height="53" src={icons[name as keyof typeof icons]}/>
        </button>
    )
}

const WalletSelector = ({ name }: { name: string }) => {
    const { wallets, updateConnectors } = useFloatingMenuState();

    const icons: WalletOptionIcon = {
        "metamask": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAb7SURBVHgBzVlpbBVVFP5m3rx5S7dXtkqL8sImr+wBq4loSkTEaMIStl+GkBgTY4DE+Bv4JX+MS/SXxsAPE9xYEhFBCI2UWBBk37Slj60UW9u39b03b5nxnHmvZaYzbwEL+iW3M+/Mvfd8c86958w9FfAA6O/v99FlvSiKczRNm0v3fmq+EsNC1ILcaMw+urbU1tYGUSaEcjoRsWZBELZQa3Y6nXA4HHojoiBZ0bFECqqqIpvN6i2dTrNsL7WPiWgL/g2ImD8UCh2NRCKaoigaKdJGAjwXz0lz72EdeBiEw+FN1PqTyaT2qMBEWQdh84OS28JvOFIWKwZyu25N1lk2uWg0+ljIGUmyzpIk2a2Py3J2JFl3QXfzYuX1YCSXjYe1tq8+0JIdbdpII3ytTWv97F0Lyfya9A/yGooRvKPcbvdyl8t1n3T3LWxf+xyqXAJWPz8FE17fCPekJjhqJ+BhoCUjiLTuxL3ff8a+o2fQG1exbf8VuCurh/qkUikkEokWn8+3iH9Lees1U0wzkWNcP/urfo0qGr493o7F3e+hodqBivkrUbFgBVyTni2LmHL9pE5MuX4Ct/4K4cC1JJSMpj+71PoT5i9dM9RXlmXQ7m5mThwnpbx8M1nPMvGlYweH7pnknstJNE2Q0YTdGDi9G1JtA3wvvgG5ssqWWPLvu4heOIJU1xX992+3Ujh5O2Xqc+rANyaCDDYUWZE3TIvA/ibrdVZXV1sUbHktgGQsYpEHxkpYOFGGSxLglDRUe9OwQzguI50VdGu1BlO42mPt5yH3bt1/xSSj5Qja1ZyBakX6racvO4x64klb+ZWeDHZdSJBVVaQzAk1oTXeqKujk2PJfn0/YkmP4bHRw+sxzWs8El0uSZDu4fmojCoEV7zqfJMUZJNOi5TmT6+zLELm4/iKF0DB1hq08n+vniMR2Iid9O4yfMgPFoGQ1HO5QcDyYsTw71qniR8NmKITxUxoLEiRXz2Vm/kIE60sQHMT5u9myZPY6ZtrK85z8/NdX6JPpbvtllMIYr4h1szymdUhrnGRujKkQS47var9oK89z8hWdoZSLeTevm+3Rd7Nm8CSTZRkT5z7FUMiCg5BKEeQobww1blI8vU7AtNFOjPPaDzeSfWmyC9PGirgRyiDYryGUuP+QQ0ypZVSUIE+w4NW1uPjDF5g+TsDTpMg/StBDSH/MPDSr8rrJ3avD9sVTNU7MrufnGoJ9Gs51qTrZBavfNKU5OwiUg7WampqCHbTwbSQ+XWiSxRIOKGmHScbBmoM2g2NjJG6OrXYB3fNOK4SawnmdPhyKW5Ch3mizyEJhCdE4n0d4MedIyQ6RSOR2bjIlorcvZ05ej+zySq9KBM3zZK8dgtS0AcVQcptlzn9nkY0dlYbHpemKo2RJbuy+QRBXfRncSzr1Pm7qO260NZNk/ziEUihKkD+PsjYWdMlkjSo6pXmA92+Ow+moF4JoCFV0+0uoAp93j0JEFlFDfV1OazbhuTUlUoyC7uIQRWzbWKgWeUOvO4uZ1Wl8P76TjpO5vDvEj27XzujHW65e/beSLmyH7FVy85xVFrmWCwUhHhnkc6vtYBvrDcJoEYdDI7fed7EkqvC5srZ9h0O9aa8jzykoEdNz9GMu577hGAjHEY+Zd2M05qCv3tx9Ha2rqoocEclhIGiYKkzhqKdPGnoRX42ZrDc8ABn2BInbDbbg2UwmAzu4Aov1xW5sLlnTwwi3RJp2c0LSd6pxhfDOZllUD0fiUP8Kr2aZTw68bKs7z2kvv9oOKkd8yF/Uw9ehu3GxZaBE8YwVDcQF3a0pItD7RBM2fnnU1O+TDYsg3jqFQcfwGBsnFTw2cImE0CLRdz/F6lALCZr5PGCE6KmGXB8Y+mQfhNejIi7WIlPXACWwDF0xDW13jpj6dNQtQf3kVyC3H4IjdokIxi0knOMD+rHBjhy5eB8XmfTFQb7exgeV4QRzb9hkIii4q+BuaMTEwBLcVCrhpPzW3fknGqdNMo3r7ulF3ZhpiARWoX7WUoAigtJxwtTHPbkJdqByC18+0vUNCrlI5PF4LCT5JNaz821UPrMSHnK5kywqunP5MxmP4WLrQaSVJG0cxTSO53HIbsx5YSlc3kpdplJcVTpOInH5MJJEdvSa7RYX54+de+nYucJEMH94OlNVVeUrVVIzIpNOIXj5DO60XzLJG+grxd84D5JTLnsu3rmxWCxE13m2NUQuO/xvSx8Gklv/q+IR60Y54I6Pu/xWNjmju7mQw0XGR4WHLmAaSPqp7eU3pN2ljQTYK4YS8NFSJeAHKaJvoracT/x80Ofczbu9nCI6Ny6gc/rKF9FbqG0rp4hefjzJEfXThckuQ+5fENzK+jcEjTlL1jtH9zs4e6FM/ANORPCifnr1KQAAAABJRU5ErkJggg==",
        "coinbase": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOySURBVHgBxVg/TBNRGP++uwK2saQDi5KQMlERQjGykSAOOHIMTooUw4IDLo4oIWHQEQZcSCiBuFpXBpHEuGgEoiJMNiQyMTSoNEDvnu87aC3l3nt3eAe/pb17f+73vn/v+z4EF2hJ5W+BxQxA6EJgcQYYAw/ga3IMtFVgbA00zHxNh9+p10jQnPqd0pk2xgDi4CP4R7MmWuPr6ctpyZzTSKby8YJlZQCxDQIEEdQRu1fT4WzlmFb54vqDgwGTWStBkyKQJgqMrbSm/hiVYyckdo1P0Bm+hgsA00Kpb7PVc8XnEjFSH0nKq2FHIwj1dWj/FrGxZcGvPQYekQshthfVGiq+NRlbckuKSNzvCYHRqcPVOmf/2dxi8HHDgvnFAmzvWG62jXG1krba6cHelbxPY9qsaiURGjaqoL9HBy94896E6Yw7ghZag+StNrHWgb0fqpDQkdBhYqhKKCEVtncYPJ46sNUsA3nql7lII9rBk6tRNrm3M2ST8gOjM4dcggX5JB5CeLgwDdmcpgbNN1IE2qsjoSlmMUMDpgvjFaltaqQa/MbEUDXURiQmwaCLU2dJ0fgj4+w2JQPtOWyEZFPiJNOYaHFvpzfv8wIKNxKpxYS0+3vUdvX2s8kDqfNYNAJw+4b8YPc4uZeZQ8cxITGVgRIpcn8ZJkdqODnxPhSgRcQcV1EgbWqQ25ZIUifnyK8lMheROh2JJRpU7uwfrtR5IHaeqI04v79wYiI4Etv1nrL4DkdidOGeFyg9coIjMfImFbloBJSIRuSeTZmGSDvCOEY5lOzaoOA5ye9ReYCVm/CnDfHhsWXAmTKd9sP0JQgSd57sC5NHOlLOaYDUubBoQlAgjUgy2hxlF1nR6DS/Ln4G4Ai0J6XaYuCqBsiWRcMktacz8vvwLKA7Vpr/I1vjEtMzkj3sSmfUR3KUWm9uqYoSzBwXI3lejLC4bCpd6pQt1J8xcST1kfTpoFJKgLwYCTfa/mwijIMCFAgfPt+3jdYrFnhteffZvpJUOZfS8XnYWOE/SXABSlcokbzJc7aEID2iAE3V0Pyi6boqL0qL/pciKC/P+6jBAYJUu/KjL14d2R3Fu3Jyu/atAZ5bBHyHnI7QXfb8D82pPK/ImbIiDwIm6n3f0zUlRzxxZ6ynw2lE1geCoBsESFIW4mA5qeP3p3HU+YEllaf+NxishTQ0nBp3ilZnnrc6YcxvgmTk5H2kIfEcF7D7G7xsB4ZtvNGbZC4cpOIjvDkMWf5nmYKnm+bwX5o8e3l3sL7EAAAAAElFTkSuQmCC",
        "ledger": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgB7ZlBcoIwFIZ/2i669Ai5QbkB9AbegBzFZZfeQI+AJyg9gfQEYamrcgP6HuiMYiSxBJPp+M38zIiS/L4k5PGIYEdKmpMSkiDN8DdqUkn6JuWkAiORJEVqJpI69HEzAt0/be4kdejTioz0c0dzR3Gfc5O5uQdjfWXXzAn4iZwukkJnUAVg7qht35wMyNxR0jp6Jlarlfa69XptvHagX/aECN1N+BMDcDvUGTabDeq6vvi+qqpWfeI4xmymv6dLKZFlGaIowgDvfFjCEG6GGnQ6hNyeIYKs5RMd3hAuCRuMES7imQ4fpl/xPCmKArvdDi7Z7/dtuwO88gxtEDBPcECaplBKYQqcGGSEEJgCZwan4mFwLA+DY3mBQxaLxdlnTjB0ScQtODHIGQ7vCEmSnJ3P8xxj+R87CQ8d53Yu4fb6U+IaxtzNYz7YcARrhEvNBiuES8mr+AsWSSuv0Gu3DF7FZVlenOcEQpdE8HMKZ0AWcJGpfWgyzkEPT3XNwVuLMpn0IHUaShmgQYke24DMKWgQCLx4BIQx1FY1Ql8FTAlLBO67skvcUAI+RcJzEX2wtHRCim7ouY7Du86Y1xAVut3L6jXEL1k7QusfUQB4AAAAAElFTkSuQmCC",
        "argent": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARDSURBVHgBzVlZaxRBEP5mTeIZs1HxQI1L8L5F1IiIG9/UeIGivgmigi/+BPEXGNEnFRH1wRdPUASPrHiAZzYYIR6J8T5iks19p61KT8zsnL2dYPJBMzvd1dXfVFdXd9caCIAQIkqPdVT4GTFLf5GgEqdSQuWcYRhx6IDJUSkS/wdFpjGUyYWpHBODAx43HEQwQiUuBhfFzMPKy7BakB4xKksw+GAfzSdfZd9FyNJwBEODIGMpJJ8e9FhSSKctQqr4/Rm4dQpoqHVpFFL9aJqgggPAxBnQAFszlma+HIEOmuuBuj9AS2MSryR0dZFcAzTBvGIhsiKbNgoddLRR6eh7N1xkuqi9vQ2a4DAYZZ/cC1001UkSDGEWOzrapZw+ekjqL5a6aqC7W/424G5JZl7/B/3AOia5FLqo/upBzC73Df1AhEmGoYO2FuDXJ+9269SzHMvrIRKCLn5WAK1N3u1WC7e3kvxH6EKPJPvhx1L1VcsfU/marNsNHeiRbKTg/e6Fc1DhIS+o4S3JNyagAz2S718BtT+d9X6LqIbkK8n6nl/ijdRJNlPMe/NYWge2MX3Hp8bi+1oxM3WSpU+Aqi997yohqBe82MqeI1WkRrKhBnhyTW6HbggizAuO+7OeFKBOspO2v6c3/cOOCni6n5Gezk7lLmok2f/KntK1KYYBQXEMqIj3+XUA1Eh+KQMeXvaeZjf4jd9Jeu5dJKIlUEEwyXo6RNw6TYeJKgSSGUbH04k58hnkn3wOvXNe6u8XSVZ0+yzdkn97y1jJTJkJbD8MTMqBElgv66/9BT2SHGbuXlCeEowaC+RtBLInAWt3Amnpav1YP1vUGtaUSH77AFw9TjvLSyhjwWog1zyazphPp9T16n2Z6BUa73s53JzZSfLre+D6CbmNecGuZ/pcsuJm0jbM1ErPvAJZbyhGOd5mb5wkohUIJhky5MVJ+JCz+iFPc3QX3QqzkmUzw7J+xBhvXcKm13odsZGsTKqZnAus2uS+Og2b0rHjgC2HgKmz4OxgyPqt1J413l2XYdO7ksadNtsumXCSDFHVapq6nHnwjCNcnTGSbsV75JT6IbKQFtIOkh/hI2RI47DLON0jzjUPHH3SMoA122kqM5362Irsc2ztWctlTAzCvFUkX9Ana5/+TJqR/N1AeoZb7xLDN3tR+ogC+Rk6GFj2Wc5I5JOvLVyLlPH6IV31LyUf15j4hn1++paFOI0BmahyYs4KYLGl85iw9MG5edDCItK16SDpycY/V+I6b30xTrD2OsBRV5H04eSfW4Dh5H9ZE4CN+2UMVA3UbshdLPVkZku9rN9bXzIvmvZCz4zhj3IhElViQNGYEOJ7uZ9EYS83e36SfVM/WTBw4L046shPmhW0pKGXZB84MMFtvQRdIWTOvFAMDgpFUM7cRnbI/PsQeNcTMn+5FzL7xr/1ckfJqDQLbyQxMwx64i+wI0Dep6sN0AAAAABJRU5ErkJggg==",
    }

    return (
        <button onClick={() => updateConnectors(name)} className={styles.insideButton} >
            <img style={
                isEnabled(wallets, name) ? {filter: "opacity(1)"} : {filter: "opacity(0.3)"}
            } height={40} width={40} src={icons[name as keyof typeof icons]} />
        </button>
    )
};

export default function FloatingMenu() {
    const { setSiwe, siwe, social, setSocial, visible } = useFloatingMenuState();

    if(!visible) return <></>;

    return (
        <div className={styles.floatingMenuWrapper}>
            <div className={styles.floatingSubitemTitle}>
                <span>Themes</span>
            </div>

            <div className={styles.floatingSubitemContainerImages}>
                <ThemeSelector name="light" />
                <ThemeSelector name="dark" />
                <ThemeSelector name="everforest" />
            </div>

            <div className={styles.floatingSubitemTitle}>
                <span>Wallets</span>
            </div>

            <div className={styles.floatingSubitemContainerImages}>
                <WalletSelector name="metamask" />
                <WalletSelector name="coinbase" />
                <WalletSelector name="ledger" />
                <WalletSelector name="argent" />
            </div>

            <div className={styles.floatingSubitemTitle}>
                <span>Authentication</span>
            </div>

            <div className={styles.floatingSubitemContainer}>
                <div className={styles.floatingSubitemToggle}>
                    <Toggle
                        defaultChecked={false}
                        icons={false}
                        onChange={() => { setSiwe(!siwe) }} />
                        <span>Sign In With Ethereum</span>
                </div>
                <div className={styles.floatingSubitemToggle}>
                    <Toggle
                        defaultChecked={false}
                        icons={false}
                        onChange={() => { setSocial(!social) }} />
                        <span>Social Login</span>
                </div>
            </div>
        </div>
    );
}