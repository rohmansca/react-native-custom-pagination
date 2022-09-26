import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import { times } from 'lodash';

export default function Pagination(props) {
  let pages = [];
  const pageNumbers = [];
  const color = props.color || "rgba(0,0,0,0.1)";
  const maxPage = props.maxPage || 5;

  const active = {
    backgroundColor: color,
  };

  const inactive = {
    color: color,
    borderColor: "rgba(0,0,0,0.23)"
  }

  switch (true) {
    case props.activePage < maxPage:
      pages = times(maxPage, i => i + 1)
      if (props.totalPages > maxPage) pages.push('.', props.totalPages)
      break;
    case props.activePage > props.totalPages - maxPage:
      pages = times(maxPage, i => props.totalPages - maxPage + i + 1)
      break;
  
    default:
      pages = [1, '.', props.activePage - 1, props.activePage, props.activePage + 1, '.', props.totalPages]
      break;
  }

  pages.forEach((page, index) => {
    pageNumbers.push(
      <TouchableOpacity
        key={index}
        disabled={page === "."}
        onPress={() => {
          props.setPage(page);
        }}
        style={[
          props.buttonStyles ? props.buttonStyles : styles.buttonStyles,
          props.activePage === page ? active : inactive,
          page === "." && {borderWidth: 0}
        ]}>
        <Text 
          style={[
            styles.paginationText,
            props.activePage !== page && { color: color }
          ]}
        >
          {page === "." ? '...' : page}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
      }}
      horizontal={true}
      style={props.style}
    >
      <View style={styles.paginationWrapper}>
        <TouchableOpacity
          disabled={props.activePage === 1}
          style={[
            props.buttonStyles ? props.buttonStyles : styles.buttonStyles,
            props.pressAbleButtonStyles
              ? props.pressAbleButtonStyles
              : styles.pressAbleButtonStyles,
          ]}
          onPress={() => {
            if (props.activePage > 1) {
              props.setPage(props.activePage - 1);
            }
          }}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.activePage !== 1 ? color : "rgba(0,0,0,0.23)"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left">
            <Path d="M15 18L9 12 15 6" />
          </Svg>
        </TouchableOpacity>
        {pageNumbers}
        <TouchableOpacity
          disabled={props.activePage === props.totalPages}
          style={[
            props.buttonStyles ? props.buttonStyles : styles.buttonStyles,
            styles.pressAbleButtonStyles,
          ]}
          onPress={() => {
            if (props.activePage !== props.totalPages) {
              props.setPage(props.activePage + 1);
            }
          }}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.activePage !== props.totalPages ? color : "rgba(0,0,0,0.23)"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right">
            <Path d="M9 18L15 12 9 6" />
          </Svg>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  paginationWrapper: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyles: {
    height: 35,
    width: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },

  pressAbleButtonStyles: {
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  paginationText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});
