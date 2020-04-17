# -*- coding: utf-8 -*-
"""
Created on Fri Mar 20 12:41:48 2020

@author: Ala'a
"""



def check_cols(unit, snum,sname,city,prov,pc):
    if not snum and not sname and not city and not pc:
        return prov
    elif not snum and not sname and not city:
        return str(prov) + ", " + str(pc) 
    elif not snum and not sname:
        return str(city) + ", " + str(prov) + ", " + str(pc)
    else:
        if unit:
            return str(unit) +"-"+ str(snum) + " " + str(sname) + ", " + str(city) + ", " + str(prov) + ", " + str(pc)
        else:
            return str(snum)+ " " + str(sname) + ", " + str(city) + ", " + str(prov) + ", " + str(pc) 

def genType(a,b,c):
    if not a and not b and not c:
        return 'Uknown'

    a = convertToChar(a)
    b = convertToChar(b)
    c = convertToChar(c)
        
    typeBin = str(a)+str(b)+str(c)
    #print(typeBin)
    #return typeBin
    return  int(typeBin, 2) 


def convertToChar(input):
    if not input:
        return '0'
    else:
        return '1'


if __name__ == "__main__":
    import pandas as pd
    import numpy as np
    
    df = pd.read_csv('ODHF_FINAL_VALIDATION.csv', encoding='latin1')
    #df = pd.read_csv('ODHF_FINAL_VALIDATION_UTF8.csv')
    df['full_address'] = ''
    #df['Type'] = ''
    df.columns
    
    #df = df.replace(np.nan, '', regex=True)
    df = df.fillna('')
    
    #df["full_address"] =  df["street_no"]+ " " + df["street_name"] + ", " + df["city"] + ", " + df["province"] + ", " + df["postal_code"]  
    df['full_address'] = df.apply(lambda row : check_cols(row['unit'], row['street_no'], row['street_name'].capitalize(), row['city'].capitalize(), row['province'].upper(), row['postal_code'].upper()), axis = 1) 
    #df['Type'] = df.apply(lambda row : genType(row['acute_care'], row['outpatient_services'], row['residential_care']), axis = 1) 
    df.to_csv('ODHF_Final_16Apr.csv',  encoding = 'utf8')
