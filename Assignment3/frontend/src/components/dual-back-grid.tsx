import { DualBackGridItem } from "./dual-back-grid-item"
import "./dual-back.scss";


export const DualBackGrid = () => {

    const gridGenerator = (): JSX.Element[] => {
        let gridItems: JSX.Element[] = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gridItems.push(<DualBackGridItem x={i} y={j} key={"grid possition: " + i + j} />);
            }
        }
        return gridItems;
    }

    return (
        <div className="dual-back-grid-container">
            {gridGenerator()}
        </div>
    )
}