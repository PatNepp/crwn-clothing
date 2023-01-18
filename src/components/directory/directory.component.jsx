import Category from '../category/category.component'
import { categories } from '../../data/categories'

import './directory.styles.scss'

const Directory = () => {
    return (
        <div className="directory-container">
        {categories.map((cat) => {
            return <Category key={cat.id} category={cat} />
        })}
        </div>
    )
}

export default Directory