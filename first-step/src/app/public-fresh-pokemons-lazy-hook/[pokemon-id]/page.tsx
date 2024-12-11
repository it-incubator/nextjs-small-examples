export async function generateStaticParams() {

    console.log('generateStaticParams')
    return [{bla: 1},{blabla:2},{ bla: 1}];
}


export default async function PokemonsPage({params}: any) {
    const value = await params;
    console.log('value: ', value)

    return (
        <div className="App">
         Pokemon page
        </div>
    )
}
