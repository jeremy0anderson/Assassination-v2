import 'react-bulma-components';


export default function Homepage(){

    return(
        <div className="sections">
            <section className="column background-black pl-6 pr-6" id="left-column">
                <section id="homepage-buttons">
                        <a href="/lobby/host">
                            <button className="button is-fullwidth mb-3 background-red" id="host">
                                Host A Game
                            </button>
                        </a>
                        <a href="/lobby/player">
                            <button className="button is-fullwidth background-blue" id="join">
                                Join A Game
                            </button>
                        </a>
                </section>
            </section>
            <section className="column is-12-mobile is-8-tablet text-white" id="right-column">
                <div id="story">
                    <h2 className="subtitle is-5 has-text-right text-white mb-5 pr-5">
                        The <span className="text-red">king</span> is dead, who will be the next <span className="text-blue">king</span> of the kingdom?
                    </h2>

                    <p className="block">
                        News spread fast of the unexpected passing of the King. The King had never declared which of his two children would become the next to sit on the throne. The people were split and tempers flared quickly…
                    </p>
                    <p className="block">
                        To prevent a civil war the King's children decided to split the kingdom. They would exchange subjects between the two kingdoms for a short time, questioning them and testing their loyalties, until they sealed off the kingdoms for good.
                    </p>
                    <p className="block">
                        Not satisfied with only half the kingdom, both siblings went to the King’s craigslist and hired assassins to kill the other so that they could have the full kingdom to themselves.
                    </p>
                    <p className="block">
                        Thus the board was set…
                    </p>
                    <p className="block">
                        They went forth with their exchanges hoping to sneak their Assassin into each other’s kingdoms to do their work so they could have the kingdom to themselves.
                    </p>
                </div>
            </section>
        </div>
    )
}