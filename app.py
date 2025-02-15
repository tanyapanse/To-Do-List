import streamlit as st

st.markdown("<h1 style='color: #1e077c;'>To-Do List</h1>", unsafe_allow_html=True)

st.markdown("""
    <style>
        [data-testid="stAppViewContainer"] {
            background-color: #bfc9f2;
        }

        input[type="text"] {
            color: #403a73 !important;
            font-size: 18px !important;
        }

        input::placeholder {
            color: #403a73 !important;
            font-style: italic;
        }

        div[data-testid="stCheckbox"] {
            background-color:#ffffff; 
            padding: 8px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }

        input[type="checkbox"] {
            accent-color: #1e077c !important;
            width: 20px;
            height: 20px;
        }

        div.stButton > button {
            background-color: #1e077c !important;
            color: white !important;
            border-radius: 8px !important;
            border: none !important;
            padding: 10px 20px !important;
            font-size: 16px !important;
            font-weight: bold !important;
        }
    </style>""", unsafe_allow_html=True)

if "task_list" not in st.session_state:
    st.session_state["task_list"] = []
    st.session_state["checkbox_states"] = {}

task = st.text_input(" ", placeholder="Enter your task here...")

col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("Add Task"):
        if task:
            st.session_state["task_list"].append(task)
            task = "" 

with col3:
    if st.button("Remove Checked Tasks"):
        tasks_to_remove = [t for i, t in enumerate(st.session_state["task_list"]) if st.session_state["checkbox_states"].get(i, False)]
        for task_to_remove in tasks_to_remove:
            st.session_state["task_list"].remove(task_to_remove)
        st.session_state["checkbox_states"] = {}


for i, t in enumerate(st.session_state["task_list"]):
    checkbox_state = st.checkbox(t, key=f"checkbox_{i}")
    st.session_state["checkbox_states"][i] = checkbox_state
