import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';
import RowView from './RowView';
import styles from './styles';
import { Answer, Answers, Nesting, Question } from '@app/types/questions';

interface ListViewProps extends Question {
    answers: Answers;
    submit: (text: Answer) => void;
    appendQuestions: (text: Question) => void;
}


function getQuestion(type: string|undefined, value: string, questions: Nesting[]): Question | null {
    const matchingQuestion = questions.find((item) => {
        if (type == "number") {
            const isAdult = parseInt(value) >= 18;
            if (isAdult) {
                return item.rule.conditions.some(
                    (condition) => condition.operator === "GTE" && parseInt(value) >= parseInt(condition.right_operand)
                );
            } else {
                return item.rule.conditions.some((condition) => condition.operator === "LT" && parseInt(value) < parseInt(condition.right_operand));
            }
        }else if (type == "mcq") {
            return item.rule.conditions.some((condition) => condition.operator === "EQ" && value == condition.right_operand); 
        }
    });
    return matchingQuestion ? matchingQuestion.question : null;
}


const ListView = ({ id, type, title, nesting, options, answers, submit, appendQuestions }: ListViewProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false)
    
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const [value, onChangeText] = React.useState<Answer>({
        question_id: id,
        answer_value: '',
        answer_time: new Date()
    });

    const [subValue, onChangeSubValue] = React.useState<Answer>({
        question_id: id,
        answer_value: '',
        answer_time: new Date()
    });
    
    useEffect(() => {
        const found = Array.from(answers).filter(
            (data: Answer) => data.question_id === id
        );
        if (found.length > 0) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [answers]);

    return (
        <>
            <TouchableOpacity
                onPress={openModal}
            >
                <View style={[styles.container]}>
                    <View style={styles.sideBox} >
                        <View style={{ width: 20, height: 20, backgroundColor: (selected ? 'green' : 'white'), borderWidth: 1, borderRadius: 100, alignItems: 'center', borderColor: '#DDDDDD' }} />
                    </View>
                    <View style={styles.mainBox} >
                        <Text>{title}*</Text>
                    </View>
                    <View style={styles.sideBox} >
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600' }}>{">"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={{ textAlign: 'right', color: 'red' }}>X</Text>
                        </TouchableOpacity>
                        <Text>{title}</Text>
                        { (type == 'text' || type == 'number') &&
                        <>
                        <View
                            style={{
                                backgroundColor: '#FFF',
                                borderBottomColor: '#000000',
                                borderBottomWidth: 1,
                            }}>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={4}
                                maxLength={40}
                                keyboardType={type=="number" ? 'number-pad' : 'default'}
                                onChangeText={answer_value => {
                                    onChangeText({
                                        ...value,
                                        answer_value
                                    });
                                }}
                                value={value.answer_value}
                                style={{ padding: 10 }}
                            />
                        </View>
                        <TouchableOpacity style={{ padding: 5, marginTop: 5, backgroundColor: 'blue', width: 80, justifyContent: 'center', borderRadius: 5 }}
                            onPress={() => {
                                closeModal();
                                submit(value);
                                if(nesting != null){
                                    let que:any = getQuestion(type, value.answer_value,nesting )
                                    if(que != null){
                                        que.question_parent_id = value.question_id
                                        appendQuestions(que)
                                    }
                                }
                            }}
                        >
                            <Text style={{ textAlign: 'center', color: '#FFF' }}>Submit</Text>
                        </TouchableOpacity>
                        </>
                        }
                        {type == 'mcq' && 
                         options?.map((item) => {
                            return(
                            <TouchableOpacity 
                                onPress={() => {
                                    closeModal()
                                    value.answer_value = item.value;
                                    submit(value);
                                    if(nesting != null){
                                        let que:any = getQuestion(type, value.answer_value,nesting )
                                        if(que != null){
                                            que.question_parent_id = value.question_id
                                            appendQuestions(que)
                                        }
                                    }
                                }}
                                style={{padding:10}} key={item.id}>
                                <Text style={{textAlign:'center'}}>{item.label}</Text>
                            </TouchableOpacity>
                            );
                         })
                        }
                        
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ListView;