import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDerectory = path.join(process.cwd(),'blogposts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDerectory);
    const allPostsData = fileNames.map((fileNames) => {
        const id = fileNames.replace(/\.md$/, '')

        const fullPath = path.join(postsDerectory, fileNames)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents)

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

        return blogPost
    })

    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}