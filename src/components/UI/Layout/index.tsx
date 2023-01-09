import './layout.css'

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (
        <main>
            <section className="cart">
                <div className="cart__selection-wrapper">
                    {props.children}
                </div>
            </section>
        </main>
    )
}

export { Layout }