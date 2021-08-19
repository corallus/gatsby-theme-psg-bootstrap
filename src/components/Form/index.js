import React from 'react'
import {Button, Form } from 'react-bootstrap'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Recaptcha from "react-recaptcha"
import axios from 'axios'
import FieldWrapper from './FieldWrapper'
import { Helmet } from 'react-helmet';
import './style.css'
import useSiteMetadata from "../SiteMetadata";

const TextAreaField = (props) => {
    return (
        <Field as="textarea" rows={6} {...props} />
    )
}

export const ResponseForm = () => {
    const {domain} = useSiteMetadata()

    const api = `https://wlpbkbt4zc.execute-api.eu-central-1.amazonaws.com/production/contact`

    return (
        <Formik
            initialValues={{
                privacy: false,
                recaptcha: "",
                to: `info@${domain}`,
                response: {
                    naam: "",
                    email: "",
                    telefoonnummer: "",
                    bericht: ""
                }
            }}
            onSubmit={(values, { setSubmitting, setStatus, resetForm }) => {
                const httpOptions = {
                    headers: {
                        'Content-Type': 'application/json',
                        'g-recaptcha': values.recaptcha,
                    }
                };

                axios.post(api, values, httpOptions)
                    .then(res => {
                        setSubmitting(false);
                        resetForm({})
                        setStatus({ message: 'Het formulier is succesvol verstuurd' })
                    })
                    .catch(error => {
                        setStatus({ message: error.response.data })
                        setSubmitting(false)
                    });
            }}

            validationSchema={Yup.object().shape({
                response: Yup.object().shape({
                    naam: Yup.string()
                        .required('Verplicht'),
                    email: Yup.string()
                        .email('Geen juist mail adres')
                        .required('Verplicht'),
                    telefoonnummer: Yup.string(),
                    bericht: Yup.string()
                        .required('Verplicht'),
                }),
                privacy: Yup.boolean()
                    .oneOf([true], 'Verplicht veld'),
                recaptcha: Yup.string()
                    .required('Verifieer dat je geen robot bent'),
            })}
        >
            {props => {
                const {
                    touched,
                    errors,
                    isSubmitting,
                    handleSubmit,
                    setFieldValue,
                    status
                } = props;
                return (
                    <Form onSubmit={handleSubmit}>
                        <Helmet>
                            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                        </Helmet>

                        <FieldWrapper id="naam" label="Naam" name="response.naam" type="text" />
                        <FieldWrapper id="email" label="Email" name="response.email" type="email" />
                        <FieldWrapper id="telefoonnummer" label="Telefoonnummer" name="response.telefoonnummer" type="tel" />
                        <FieldWrapper id="bericht" label="Bericht" name="response.bericht" type="textarea" component={TextAreaField} />
                        <Form.Group>
                            <Form.Check>
                                <Form.Check.Input
                                    name="privacy"
                                    as={Field}
                                    type="checkbox"
                                    isValid={touched.privacy && !errors.privacy}
                                    isInvalid={touched.privacy && Boolean(errors.privacy)}
                                />
                                <Form.Check.Label>
                                    Ik ga akkoord met de <a href="/static/privacy-statement.pdf"
                                                            rel="noopener noreferrer" target="_blank"> privacy voorwaarden</a>
                                </Form.Check.Label>
                                <ErrorMessage name="privacy" component={Form.Control.Feedback} />
                            </Form.Check>
                        </Form.Group>

                        <Form.Group className={'text-center'}>
                            <Recaptcha
                                sitekey="6LeZnxkaAAAAAHsyk5igUVRWXPmLRz78Il6s8g0d"
                                render="explicit"
                                theme="light"
                                verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
                                onloadCallback={() => { console.log("done loading!"); }}
                            />
                        </Form.Group>

                        <Form.Group className={'form-buttons'}>
                            <Button variant="primary" type="submit" disabled={isSubmitting} >
                                {isSubmitting ? 'Aan het versturen…' : 'Versturen'}
                            </Button>
                            {status && status.message &&
                            <div>{status.message}</div>
                            }
                        </Form.Group>
                    </Form>
                )
            }}
        </Formik>
    )
}