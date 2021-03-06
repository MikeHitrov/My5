import React, { useState, useCallback } from 'react';
import {
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

const CenteredTitle = ({ children }) => <h5 className="w-100">{children}</h5>;

const versions = ({ isOpen, setIsOpen }) => {
    return (
        <Modal isOpen={isOpen} size='xl'>
            <ModalHeader tag={CenteredTitle} className="text-center" toggle={() => setIsOpen(false)}>
                Версии на „My5“
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={{ size: 10, offset: 1 }} sm="12">
						<h5>Версия 1.23</h5>
                        <p>Добавени бяха характерни цветове за типовете файлове.</p>
                        <h5>Версия 1.22</h5>
                        <p>Добавени бяха икони за най-популярните файлови разширения.</p>
                        <h5>Версия 1.21</h5>
                        <p>Беше извършена финална оптимизация на кода. Създадена беше система за автоматично стартиране на node модула в случай на неочаквано прекъсване на работа му.</p>
                        <h5>Версия 1.20</h5>
                        <p>Беше оправена грешка в кода, която се получаваше при автоматично превеждане от Google Translate на сайта.</p>
                        <h5>Версия 1.19</h5>
                        <p>Добавена беше възможността да се прекъсва качването на файл. Създаден беше допълнителен бутон за целта, а малко текстово поле показваше процентното отчитане на качването. Беше разширена лентата на прогреса, за да се вижда по-ясно и при мобилни устройства. Посочените компоменти бяха преместени в долната дясна част на екрана.</p>
                        <h5>Версия 1.18</h5>
                        <p>Добавена беше информация за самия проект и същността му преди влизането в системата.</p>
                        <h5>Версия 1.17</h5>
                        <p>Беше добавен модален прозорец, който да извежда запитване преди изтриването на файлове или папки. Създаването на папки беше променено да става също с помощта на модалния прозорец.</p>
                        <h5>Версия 1.16</h5>
                        <p>Добавена беше възможност за сваляне на качените файлове.</p>
                        <h5>Версия 1.15</h5>
                        <p>Беше добавена възможност за изтриване на файловете или папките.</p>
                        <h5>Версия 1.14</h5>
                        <p>Добавиха се съобщения за всяко едно от действията с помощта на NotifyJS.</p>
                        <h5>Версия 1.13</h5>
                        <p>Добавиха се CSS ефекти и различни промени по дизайна, които да придават по-добра завършеност на цялостната визия.</p>
                        <h5>Версия 1.12</h5>
                        <p>Дизайнът допълнително беше изчистен за мобилни устройства, като бутоните за Назад и Изход бяха заменени само от икони при по-малка резолюция на мобилното устройство.</p>
                        <h5>Версия 1.11</h5>
                        <p>Добавена беше възможността за мигновено обновяване на списъка с файлове и папки при достъп от различни устройства. Вече качването на файл от едно устройство се отбелязваше своевеременно и на останалите устройства, с които потребителят е влязъл в системата.</p>
                        <h5>Версия 1.10</h5>
                        <p>Бяха направени значителни промени в дизайна. Всичко стана по-приветливо и по-лесно за използване, като иконите станаха главна част от дизайна, който вече беше напълно отзивчив за мобилни устройства.</p>
                        <h5>Версия 1.09</h5>
                        <p>Създадена беше база данни за файловата система, позволяваща проследяване на всеки файл или папка на принципа на онаследяването.</p>
                        <h5>Версия 1.08</h5>
                        <p>Създадена беше лента на прогреса, показваща докъде е стигнало качването на даден файл.</p>
                        <h5>Версия 1.07</h5>
                        <p>Добавено беше пренаписване на кода в Apache, за да се поддържат едноименните връзки.</p>
                        <h5>Версия 1.06</h5>
                        <p>Добавен беше бутон за изход от системата.</p>
                        <h5>Версия 1.05</h5>
                        <p>Добавена беше поддръжката на икони с използването на безплатния Font Awesome.</p>
                        <h5>Версия 1.04</h5>
                        <p>Беше пренаписан дизайна, за да се ползва ReactJS.</p>
                        <h5>Версия 1.03</h5>
                        <p>Добавена беше възможност за качване на нов файл, преди да е завършило качването на предишния.</p>
                        <h5>Версия 1.02</h5>
                        <p>Добавена беше възможност за качване на файлове.</p>
                        <h5>Версия 1.01</h5>
                        <p>При логин се създаваше потребителска папка. Добавена беше възможност създаване на папки.</p>
                        <h5>Версия 1.00</h5>
                        <p>Създадена беше формата за вход. Добавени бяха възможност за влизане в системата с използване на jwt. Създадена беше основната база данни с потребители.</p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setIsOpen(false)} className="my-0 mx-auto" color="primary">
                    Добре
            </Button>
            </ModalFooter>
        </Modal>
    );
}



export default versions;
