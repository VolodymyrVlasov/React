import UniSearch from "../../components/UniSearch/UniSearch";
import {useEffect, useMemo} from "react";
import {useAppContext} from "../../hooks/useAppContext";
import useFetch from "../../hooks/useFetch";

import "./Design.css"
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import Button from "../../components/Button/Button";

const result = (list) => {
    return list
}

const Design = () => {
    const [{searchQuery}, appDispatch] = useAppContext()
    const {data, error, loading, fetchData} = useFetch()

    useEffect(async () => {
        if (searchQuery) {
            await fetchData("searchCustomersByKey", searchQuery)
        }
    }, [searchQuery])

    const resultList = useMemo(() => {
        if (error?.response?.status === 404) {
            return result([])
        }
        return result(data)
    }, [data, error])

    const onSelectedItem = (item) => {
        console.table(item)
    }

    return (
        <>
            <section className="section container col-left gap-24">
                <div className="col-left full-width gap-24 theme-card">
                    <h1 className={"text-h2--bold"}>UniSearch</h1>
                    <UniSearch resultList={resultList}
                               onSelectItem={onSelectedItem}
                               placeholder={"Placeholder text"}
                               isDropDown={true} isIcon={true} isFullWidthDropDown={true}
                               isShowSelectedItem={true}
                    />
                </div>
            </section>

            <section className="section container row-left gap-24">
                <div className="col-left full-width gap-24 theme-card">
                    <h1 className={"text-h2--bold"}>Auth provider button</h1>
                    <GoogleButton/>
                </div>
                <div className="col-left full-width gap-24 theme-card">
                    <h1 className={"text-h2--bold"}>Button</h1>
                    <div className={"col-left gap-16 wrap full-width row-vertical-center"}>
                        <div className="row-left gap-16">
                            <Button/>
                            <Button isLoading={true} disabled={true}/>
                            <Button type={"minus"}/>
                            <Button type={"cancel"}/>
                            <Button type={"drop"}/>
                        </div>
                    </div>
                </div>
            </section>


            <section className="section container col-left gap-24">
                <h1 className={"text-h2--bold"}>Typography</h1>
                <div className="col-left gap-8">
                    <div className="row-left gap-8">
                        <Fieldset label={"text-h1--bold"}>
                            <h1 className="text-h1--bold">Heading 1 bold</h1>
                        </Fieldset>
                        <Fieldset label={"text-h2--bold"}>
                            <h2 className="text-h2--bold">Heading 2 bold</h2>
                        </Fieldset>
                        <Fieldset label={"text-h3--bold"}>
                            <h3 className="text-h3--bold">Heading 3 bold</h3>
                        </Fieldset>
                        <Fieldset label={"text-h4--bold"}>
                            <h4 className="text-h4--bold">Heading 4 bold</h4>
                        </Fieldset>
                    </div>
                    <div className="row-left gap-8">
                        <Fieldset label={"text-h1"}>
                            <h1 className="text-h1">Heading 1</h1>
                        </Fieldset>
                        <Fieldset label={"text-h2"}>
                            <h2 className="text-h2">Heading 2</h2>
                        </Fieldset>
                        <Fieldset label={"text-h3"}>
                            <h3 className="text-h3">Heading 3</h3>
                        </Fieldset>
                        <Fieldset label={"text-h4"}>
                            <h4 className="text-h4">Heading 4</h4>
                        </Fieldset>
                    </div>
                    <div className="row-left gap-8">
                        <Fieldset label={"text-primary-p--bold"}>
                            <p className="text-primary-p--bold">Paragraph primary bold</p>
                        </Fieldset>
                        <Fieldset label={"text-primary-label--bold"}>
                            <p className="text-primary-label--bold">Label primary bold</p>
                        </Fieldset>
                        <Fieldset label={"text-secondary-p--bold"}>
                            <p className="text-secondary-p--bold">Paragraph secondary bold</p>
                        </Fieldset>
                        <Fieldset label={"text-secondary-label--bold"}>
                            <p className="text-secondary-label--bold">Label secondary bold</p>
                        </Fieldset>
                    </div>
                    <div className="row-left gap-8">
                        <Fieldset label={"text-primary-p"}>
                            <p className="text-primary-p">Paragraph primary</p>
                        </Fieldset>
                        <Fieldset label={"text-primary-label"}>
                            <p className="text-primary-label">Label primary</p>
                        </Fieldset>
                        <Fieldset label={"text-secondary-p"}>
                            <p className="text-secondary-p">Paragraph secondary</p>
                        </Fieldset>
                        <Fieldset label={"text-secondary-label"}>
                            <p className="text-secondary-label">Label secondary</p>
                        </Fieldset>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Design

const Fieldset = (
    {
        label, children
    }
) => {
    return (
        <fieldset className={"fieldset"}>
            <legend className={"legend text-primary-p"}>{label}</legend>
            <div className={"row-center"}>{children}</div>
        </fieldset>
    )
}